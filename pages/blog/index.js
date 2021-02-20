import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

let Blogs = ({ blogs }) => {
  return (
    <>
      <Head>
        <title>Blog Page</title>
      </Head>
      {blogs.length === 0 ? (
        "No Blogs"
      ) : (
        <div className={styles.grid} style={{ textAlign: "center" }}>
          {blogs.map((blog) => {
            return (
              <div key={blog.title}>
                <Link                  
                  href={`/blog/${blog.title}`}
                >
                  {blog.title}
                </Link>
                <br />

                <p>{blog.decription}</p>
              </div>
            );
          })}
          <h5>Count: {blogs.length}</h5>
        </div>
      )}
    </>
  );
};
export default Blogs;

export async function getStaticProps() {
  try {
    let res = await fetch("https://60125bea84695f001777a2d6.mockapi.io/blogs");
    let blogs = await res.json();
    return {
      props: {
        blogs,
      },
      revalidate:1
    };
  } catch (error) {
    return {
      props: {
        blogs: [],
      },
      revalidate:1
    };
  }
}
