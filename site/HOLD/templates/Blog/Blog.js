import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import "../../styles/prose.css";

import Layout from "../Layout";
import PageHeader from "../../components/Layouts/PageHeader";

import { shortcodes } from "../../components/Widgets/Widgets";

const LayoutBlog = ({ data }) => {
    const { frontmatter, body } = data.file.childMdx;
    const { title, featureImg } = frontmatter;
    const featureImgSrc = featureImg && featureImg.childImageSharp.fluid.src;

    return (
        <Layout
            featureImg={featureImgSrc}
            sidebarLeft={false}
            sidebarRight={false}
        >
            <div className="mx-auto">
                <PageHeader>
                    <h1 className="m-0">{title}</h1>
                </PageHeader>

                <div className="mt-8 prose">
                    <MDXProvider components={shortcodes}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                </div>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query blogQuery($id: String) {
        file(id: { eq: $id }) {
            childMdx {
                body
                frontmatter {
                    title
                }
            }
        }
    }
`;

export default LayoutBlog;
