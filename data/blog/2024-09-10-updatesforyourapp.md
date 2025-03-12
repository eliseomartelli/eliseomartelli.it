---
title: "Updates for you macOS app"
date: 2024-10-09 19:40
excerpt: Nag your users, but just a little bit
tags:
  - Programming
  - Short
---

Keeping your users informed about the latest version of your application
is important for enhancing the user experience.
In this post I will outline how I implemented a feature to notify the user
of the latest update for you app, providing a link to download it.

It was a "rush" feature, I worked on this for less than two hours, so it's not
perfect by any means, but it's serviceable.
The latest version will be sourced from GitHub releases.

## Connecting to the API

The first step I had to take was retrieving the latest version of the app
from the GitHub's API.

To accomplish this, I designed a function that accepts a closure to forward its
output. Using a closure provides flexibility in handling the result, whether
it’s a successful version retrieval or an error. This design pattern is
particularly useful in asynchronous programming, as it allows the application
to remain responsive while waiting for the network call to complete.

The GitHub API returns a JSON list of the releases of our application. Each
release contains various pieces of information, but for our purpose, I only
needed the name of the latest version. This simplifies the data I need to
handle.

```swift title="App/Updates/GitHubVersion.swift"
import Foundation

struct GithubVersion: Decodable {
    let name: String
}
```

This struct conforms to the `Decodable` protocol, allowing it to be easily
parsed from the JSON response.

```swift title="App/Updates/GitHubVersionRepository.swift"
import Foundation

enum GithubVersionRepositoryError: Error {
    case noData
    case noVersionFound
}

let GITHUB_API_URL: URL = URL(string: "https://api.github.com/repos/")!

struct GithubVersionRepository {
    static let shared = GithubVersionRepository()
    func getVersion(completion: @escaping (Result<String, any Error>) -> Void) {
        URLSession.shared.dataTask(with: getReleasesUrl(repoUrl: "eliseomartelli/Cleeb")) {
            data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            guard data != nil else {
                completion(.failure(GithubVersionRepositoryError.noData))
                return
            }
            do {
                let versions = try JSONDecoder().decode([GithubVersion].self, from: data!)
                guard let latestVersion = versions.first else {
                    completion(.failure(GithubVersionRepositoryError.noVersionFound))
                    return
                }
                completion(.success(latestVersion.name))
                return
            } catch {
                completion(.failure(error))
                return
            }
        }.resume()
    }

    // Obtains the repo URL endpoint for releases.
    private func getReleasesUrl(repoUrl : String) -> URL {
        return GITHUB_API_URL
            .appendingPathComponent(repoUrl)
            .appendingPathComponent("releases")
    }
}
```

In the `getVersion` function, I initiate a data task with `URLSession` to call
the GitHub releases endpoint for my application. If there’s an error during the
request or if no data is returned, the closure is invoked with an appropriate
error message. If the data is successfully retrieved, I decode it into an array
of `GithubVersion` instances. I extract the latest version name and
call the completion closure with it.

## Making it work

To effectively manage and display version information, I created a
`VersionViewModel`. This class conforms to `ObservableObject` protocol,
allowing it to notify SwiftUI for any changes.

```swift title="App/Updates/VersionViewModel.swift"
import Foundation

class VersionViewModel: ObservableObject {
    @Published var latestVersion: String = Bundle.main.buildVersion!
    @Published var errorMessage: String?
    @Published var isUpdateAvailable: Bool = false

    init() {
        self.fetchLatestVersion()
    }

    private func fetchLatestVersion() {
        GithubVersionRepository.shared.getVersion { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let version):
                    self.latestVersion = version
                case .failure(let error):
                    self.errorMessage = error.localizedDescription
                }
                self.isUpdateAvailable = Bundle.main.buildVersion != self.latestVersion
            }
        }
    }
}
```

## Updating the UI

```swift title=App/Views/MainView.swift
import SwiftUI

struct MainView: View {
    @EnvironmentObject var versionViewModel: VersionViewModel

    var body: some View {
        VStack {
            if versionViewModel.isUpdateAvailable {
                Button(action: openDownloadPage) {
                    Text(version)
                        .font(.caption)
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .clipShape(Capsule())
                }
                .buttonStyle(PlainButtonStyle())
            }
        }
    }

    private func openDownloadPage() {
        if let url = URL(string: "https://github.com/eliseomartelli/Cleeb/releases") {
            NSWorkspace.shared.open(url)
        }
    }
}
```

## Integrate Everything

Integrate the `VersionViewModel` into your app structure to allow your views to
access the latest version data.

```swift title=App/YourApp.swift
@main
struct YourApp: App {
    @StateObject private var versionViewModel = VersionViewModel()

    var body: some Scene {
        Window("Your App", id: "yourapp") {
            MainView()
                .environmentObject(versionViewModel)
        }
    }
}
```

Now I can notify users of updates to my application!

If you found this interesting, check out
[Cleeb](https://github.com/eliseomartelli/Cleeb), the app I made to help you
clean your macOS laptop keyboard!
