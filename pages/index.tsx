import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import PostThumb from '../components/Post'
import { sanityClient } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  return (
    <div className="">
      <Head>
        <title>Medium 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Head Section */}
      <main className="border-y border-black bg-yellow-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-20">
          <div className="space-y-5">
            <h1 className="max-w-xl font-serif text-5xl lg:text-6xl">
              <span className="underline decoration-black decoration-4">
                Devium
              </span>{' '}
              is a place for developers to write, read and connect.
            </h1>
            <h2>
              It's easy and free to post your thinking on any topic and connect
              with millions of readers.
            </h2>
          </div>
          <img
            className="mr-5 hidden h-32 md:inline-flex lg:mr-10 lg:h-48"
            src="/images/DLight.svg"
            alt="Devium Logo"
          />
        </div>
      </main>

      {/* Posts Section */}
      <section>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-10 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostThumb key={post._id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title, 
    author-> {
      name,
      image,
      slug
    },
    description,
    mainImage,
    slug,
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
