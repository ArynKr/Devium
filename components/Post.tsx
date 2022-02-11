import Link from 'next/link'
import { Post } from '../typings'
import { urlFor } from '../sanity'

interface Props {
  post: Post
}

function PostThumb({ post }: Props) {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 px-10 py-5 sm:grid-cols-2 lg:grid-cols-3">
      <div key={post._id} className="group overflow-hidden rounded">
        {/* Main Image */}
        <Link href={`/posts/${post.slug.current}`}>
          <div className="cursor-pointer overflow-hidden rounded-t">
            <img
              src={urlFor(post.mainImage).url()!}
              alt={post.description}
              className="h-60 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>
        </Link>
        {/* Post Description */}
        <div className="flex justify-between rounded-b-md border-2 border-t-0 border-gray-400 bg-white p-5">
          <div className="w-[75%]">
            <Link href={`/posts/${post.slug.current}`}>
              <h3 className="mb-2 cursor-pointer text-2xl hover:underline">
                {post.title}
              </h3>
            </Link>
            <h4>
              {post.description} <br />
              <p className="mt-4">
                by{' '}
                <Link href={`/users/${post.author.slug.current}`}>
                  <em className="cursor-pointer hover:underline">
                    {post.author.name}
                  </em>
                </Link>
              </p>
            </h4>
          </div>
          <div>
            <Link href={`/users/${post.author.slug.current}`}>
              <img
                className="h-12 w-12 cursor-pointer rounded-full object-cover"
                src={urlFor(post.author.image).url()!}
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostThumb
