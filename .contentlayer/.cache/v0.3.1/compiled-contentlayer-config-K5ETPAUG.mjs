// contentlayer.config.js
import {
  defineDocumentType,
  defineNestedType,
  makeSource
} from "contentlayer/source-files";

// src/lib/timeToRead.ts
var WPM_READ = 200;
var timeToRead = (content) => {
  const { round, max } = Math;
  return max(1, round(content.split(" ").length / WPM_READ)).toString();
};

// contentlayer.config.js
var Photo = defineNestedType(() => ({
  name: "Photo",
  fields: {
    title: {
      type: "string"
    },
    url: {
      type: "string"
    },
    aspect: {
      type: "enum",
      options: ["vertical", "horizontal"]
    }
  }
}));
var Photos = defineDocumentType(() => ({
  name: "Photos",
  filePathPattern: `photos/*.yaml`,
  contentType: "yaml",
  fields: {
    title: {
      type: "string",
      description: "The title of the photo section.",
      required: true
    },
    photos: { type: "list", of: Photo }
  }
}));
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/*.md`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    excerpt: {
      type: "string",
      description: "The excerpt of the post",
      required: true
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "The tags of the post",
      required: true
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath
    },
    timeToRead: {
      type: "number",
      resolve: (post) => timeToRead(post.body.raw)
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: ".",
  documentTypes: [Post, Photos]
});
export {
  Photos,
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-K5ETPAUG.mjs.map
