"use client"

import { LucideHeart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import useLike from "@/hooks/useLike"
import { TPostItem } from "@/types/posts"

type LikeButtonProps = {
  post: TPostItem
}

const LikeButton: React.FC<LikeButtonProps> = ({ post }: LikeButtonProps) => {
  const { isLiked, isLoading, totalLike, likePost } = useLike({ post })

  return (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={isLoading}
              variant="link"
              className="h-8 rounded-md p-0 px-2 text-gray-600 hover:bg-slate-300"
              onClick={likePost}
            >
              {isLiked ? (
                <LucideHeart className="h-4 w-4 text-red-500" />
              ) : (
                <LucideHeart className="h-4 w-4" />
              )}
              <span className="ml-1 hover:no-underline">{totalLike}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{isLiked ? "Unlike" : "Like"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default LikeButton
