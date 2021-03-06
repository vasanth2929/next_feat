import Head from "next/head";
import { useEffect } from "react";
import { useRouter} from 'next/router';
import Link from 'next/link'

let Blog = ({ blog,err }) => {
    let r = useRouter()
    
        if(typeof blog === 'string') {
            return <>{err}</>
        }
    
if(r.isFallback) return <>loading</>
  return (
    <>
      <Head>
        <title>Blog Page</title>
      </Head>
      
                  <h3>{blog.title}</h3>

                <p>{blog.decription}</p>

                <Link href="/blog">
                back
                </Link>
    </>
  );
};
export default Blog;

export async function getStaticProps(ctx) {
  try {
    let res = await fetch(encodeURI("https://60125bea84695f001777a2d6.mockapi.io/blogs/"+ctx.params.slug));
    let blog = await res.json()

    return {
      props: {
        blog:blog || '',
      },
      revalidate:1
    };
  } catch (error) {
    return {
      props: {
        blog:'',
err:error.message
      },
      revalidate:1
    };
  }
}

export async function getStaticPaths(){
    try {
        let res = await fetch(encodeURI("https://60125bea84695f001777a2d6.mockapi.io/blogs"));
        let blogs = await res.json();
        return {
            paths : blogs.map(item=>({params:{slug:item.id}})),
            fallback: true
        }
    } catch (error) {
        return {
            paths:[],
            fallback:'blocking'
        }
    }
}
