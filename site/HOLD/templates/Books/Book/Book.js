import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "../../Layout";
import PageHeader from "../../../components/Layouts/PageHeader";
import BookOverlay from "../../../img/book-overlays/book-overlay.png";

import {
    RiGridFill,
    RiBookOpenFill,
    RiFileTextLine,
    RiSwordLine,
    RiParentLine,
    RiTimeLine,
    RiQuillPenLine,
    RiPriceTag3Line,
} from "react-icons/ri";

const Book = ({ data }) => {
    const file = data.file;
    const { slug } = file.fields;
    const { body } = file.childMdx;
    const { title, blurb, author, cover, meta } = file.childMdx.frontmatter;
    const coverSrc = cover.childImageSharp.fluid.src;

    let temp = "flex-initial w-40 py-4 px-2 m-0 text-center text-gray-600";
    let tempIcon = "block w-auto h-8 mx-auto";
    let tempLabel = "block mt-2 text-xs uppercase tracking-widest";
    let tempValue = "mt-0 text-sm";

    return (
        <Layout cover={coverSrc} sidebarLeft={false} sidebarRight={false}>
            <div className="pb-32">
                <PageHeader>
                    <div className="w-full">
                        <Link
                            to="/books/"
                            title="Return to view all books"
                            className="btn-ghost table text-sm"
                        >
                            <div className="flex justify-start items-center space-x-2">
                                <span>
                                    <RiGridFill />
                                </span>
                                <span>View All</span>
                            </div>
                        </Link>
                    </div>
                </PageHeader>

                <div className="mt-8 -mx-8 px-8 flex flex-wrap justify-start items-stretch bg-gray-500">
                    <div className="flex-intial w-full sm:w-48 mt-8 sm:-mb-4">
                        <div className="relative w-48 max-w-full mx-auto rounded-lg rounded-tl-sm rounded-bl-sm shadow-xl overflow-hidden">
                            {BookOverlay && (
                                <span
                                    className="absolute z-10 top-0 left-0 w-full h-full bg-repeat-y bg-contain"
                                    style={{
                                        backgroundImage:
                                            `url(` + BookOverlay + `)`,
                                    }}
                                />
                            )}
                            <Img
                                objectFit="cover"
                                objectPosition="50% 50%"
                                fluid={cover.childImageSharp.fluid}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex items-center p-8 text-white">
                        <div className="flex-row justify-start">
                            <h1 className="m-0 font-black text-3xl">{title}</h1>
                            <p className="mt-2 font-bold italic text-lg">
                                {blurb}
                            </p>
                            <p className="mt-2">
                                <b>{author}</b>
                            </p>

                            <Link
                                className="btn-light table mt-8"
                                to={slug + `contents/`}
                            >
                                <div className="flex items-center space-x-2">
                                    <span>Read Book</span>
                                    <span>
                                        <RiBookOpenFill />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap justify-start items-start space-x-8">
                    {meta && (
                        <ul className="flex-intial w-full sm:w-48 mb-8 sm:mb-0 flex flex-wrap justify-center items-stretch">
                            {meta.language && (
                                <li className={temp}>
                                    <RiFileTextLine className={tempIcon} />
                                    <small className={tempLabel}>
                                        Language
                                    </small>
                                    <p className={tempValue}>{meta.language}</p>
                                </li>
                            )}
                            {meta.genre && (
                                <li className={temp}>
                                    <RiSwordLine className={tempIcon} />
                                    <small className={tempLabel}>Genre</small>
                                    <p className={tempValue}>{meta.genre}</p>
                                </li>
                            )}
                            {meta.audience && (
                                <li className={temp}>
                                    <RiParentLine className={tempIcon} />
                                    <small className={tempLabel}>
                                        Audience
                                    </small>
                                    <p className={tempValue}>{meta.audience}</p>
                                </li>
                            )}
                            {meta.updated && (
                                <li className={temp}>
                                    <RiTimeLine className={tempIcon} />
                                    <small className={tempLabel}>Updated</small>
                                    <p className={tempValue}>{meta.updated}</p>
                                </li>
                            )}
                            {meta.published && (
                                <li className={temp}>
                                    <RiQuillPenLine className={tempIcon} />
                                    <small className={tempLabel}>
                                        Published
                                    </small>
                                    <p className={tempValue}>
                                        {meta.published}
                                    </p>
                                </li>
                            )}
                            {meta.tags && meta.tags.length > 0 && (
                                <li className={temp}>
                                    <RiPriceTag3Line className={tempIcon} />
                                    <small className={tempLabel}>Tags</small>
                                    <p className={tempValue}>
                                        {meta.tags[0]}
                                        {meta.tags.length > 1 && (
                                            <small>
                                                <br /> + {meta.tags.length - 1}{" "}
                                                others
                                            </small>
                                        )}
                                    </p>
                                </li>
                            )}
                        </ul>
                    )}

                    <div className="flex-1 py-4 prose">
                        <h2>About the Book</h2>

                        <br />

                        <MDXProvider>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query BookQuery($id: String) {
        file(id: { eq: $id }) {
            fields {
                slug
                book
            }
            childMdx {
                id
                body
                frontmatter {
                    title
                    blurb
                    author
                    cover {
                        childImageSharp {
                            fluid(maxWidth: 1600, maxHeight: 2560) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                    meta {
                        language
                        genre
                        audience
                        updated(formatString: "YYYY/MM/DD")
                        published(formatString: "YYYY/MM/DD")
                        tags
                    }
                }
            }
        }
    }
`;

export default Book;
