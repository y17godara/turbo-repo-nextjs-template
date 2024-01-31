import React from "react"
import dayjs from "dayjs"
import Link from "next/link"

import APP_ROUTES from "@/constants/routes"
import { TPostItem } from "@/types/posts"
import { generatePath } from "@/utils/generatePath"

type PostMetaProps = {
  post: TPostItem
}

const PostMeta: React.FC<PostMetaProps> = ({ post }) => {
  return (
    <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
      <div className="text hover:underline">
        <Link
          href={generatePath(APP_ROUTES.AUTHOR, {
            authorId: post?.author?.id,
          })}
        >
          @{post?.author?.name}
        </Link>
      </div>
      <div className="h-1 w-1 rounded bg-gray-400" />
      <time>Last edited: {dayjs(post?.createdAt).format("MMMM D, YYYY")}</time>
    </div>
  )
}

export default PostMeta
