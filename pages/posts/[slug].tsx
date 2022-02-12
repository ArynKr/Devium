import { GetStaticProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'

interface Props {
  post: Post
}

function Post({ post }: Props) {
  return (
    <main>
      <img
        className="h-80 w-full object-cover"
        src={urlFor(post.mainImage).url()!}
      />
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type=="post"]{
    _id,
    slug
  }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx

  const query = `*[_type=="post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author-> {
      name, 
      image,
    },
    "comments": *[
      _type == "comment" &&
      post.ref == ^._id &&
      approved == true],
    description,
    mainImage,
    slug,
    body
  }`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // Every 60 second update the cache
  }
}
