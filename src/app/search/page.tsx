"use client"
import { Post } from '@/.contentlayer/generated'
import { Input } from '@/components/Input'
import { PageLayout } from '@/components/PageLayout'
import { PostList } from '@/components/PostList'
import WidthLimit from '@/components/WidthLimit'
import { allSortedPosts } from '@/lib/data/allSortedPosts'
import { embeddingSystem } from '@/lib/embeddings/embeddingSystem'
import React, { useEffect, useState } from 'react'

export default function SearchPage() {
  const [search, setSearch] = useState("")
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(embeddingSystem.searchSimilarPosts(search, 5)
      .map(p => p.post)
    )
  }, [search])

  return (
    <PageLayout routes={[
      { href: "/search", name: "Search" }
    ]}
      center={false}>
      <WidthLimit>
        <Input onChange={(e) => setSearch(e.currentTarget!.value)} placeholder={"Search..."} className="p-4 border-2 w-full rounded-lg shadow-xl mb-8" />
        {posts.length > 0 ?
          <PostList posts={posts} /> :
          <PostList posts={allSortedPosts} />
        }
      </WidthLimit>
    </PageLayout>
  )
}

