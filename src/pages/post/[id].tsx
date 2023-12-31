import { getAllPostIds, getPostData } from "@/lib/post";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import homeStyles from "../../styles/Home.module.css";
import postStyles from "../../styles/Post.module.css";

export default function Post({ postData }: { postData: {
  title: string,
  date: string,
  contentHtml: string
}}) {
  return (
    <>
      <div className={postStyles.container} >
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={homeStyles.headingXl}>{postData.title}</h1>
          <div>
            {postData.date}
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </div>
    </>
  )
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  //  [{ params: { id: 'ssg-ssr' }}, { params: { id: 'pre-rendering' }}}}]
  return {
    paths,
    fallback: false
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData
    }
  }
};