import Head from "next/head";
import { useEffect } from "react";
import { useRouter} from 'next/router';
import Link from 'next/link'

let Blog = ({ blog }) => {
    let r = useRouter()
    useEffect(()=>{
        if(!blog) {
            r.push('/');
        }
    })
  return (
    <>
      <Head>
        <title>Blog Page</title>
      </Head>
      
                  <h3>{blog.title}</h3>

                <p>{blog.decription}</p>

                <Link href="/">
                back
                </Link>
    </>
  );
};
export default Blog;

export async function getStaticProps(ctx) {
  try {
    let res = await fetch("https://60125bea84695f001777a2d6.mockapi.io/blogs");
    let blogs = await res.json()

    return {
      props: {
        blog:blogs.find(item=>ctx.params.slug === item.title) || '',
      },
    };
  } catch (error) {
    return {
      props: {
        blog:'',
      },
    };
  }
}

export async function getStaticPaths(){
    try {
        let res = await fetch("https://60125bea84695f001777a2d6.mockapi.io/blogs");
        let blogs = await res.json();
        return {
            paths : blogs.map(item=>({params:{slug:item.title}})),
            fallback: false
        }
    } catch (error) {
        return {
            paths:[],
            fallback:false
        }
    }
}