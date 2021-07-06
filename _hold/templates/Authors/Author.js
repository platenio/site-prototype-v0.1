import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import "../../styles/prose.css";

import Layout from "../Layout";
import PageHeader from "../../components/Layouts/PageHeader";
import SecBooks from "../../components/Widgets/Sec/Books";

import {
    RiEarthFill,
    RiTwitterFill,
    // RiInstagramFill,
    // RiFacebookBoxFill,
    // RiLinkedinBoxFill,
    // RiTwitchFill,
    // RiYoutubeFill,
    // RiDiscordFill,
    RiGithubFill,
    RiDribbbleFill,
    // RiMediumFill,
    // RiPatreonFill,
} from "react-icons/ri";

const Author = ({ data }) => {
    const { frontmatter, body } = data.file.childMdx;
    const { title, user, links, avatar } = frontmatter;
    const imgAvatar = avatar && avatar.childImageSharp.fluid;

    return (
        <Layout featureImg={false} sidebarLeft={false} sidebarRight={false}>
            <div className="mx-auto">
                <PageHeader>
                    <div className="flex flex-wrap justify-center items-end space-x-4">
                        <div className="w-full sm:w-64 sm:flex-1 text-center sm:text-left prose">
                            <h1 className="m-0">{title}</h1>
                            <p className="m-0 text-sm">@{user}</p>
                        </div>
                        <div className="flex justify-end items-end">
                            <ul className="flex flex-wrap justify-start items-start space-x-2">
                                {links.map((link, i) => {
                                    let network = "Website";
                                    let title = "Website";
                                    let icon = <RiEarthFill />;

                                    if (RegExp("github.com").test(link)) {
                                        network = "GitHub";
                                        title = "Follow me on GitHub";
                                        icon = <RiGithubFill />;
                                    }
                                    if (RegExp("twitter.com").test(link)) {
                                        network = "Twitter";
                                        title = "Follow me on Twitter";
                                        icon = <RiTwitterFill />;
                                    }
                                    if (RegExp("dribbble.com").test(link)) {
                                        network = "Dribbble";
                                        title = "Follow me on Dribbble";
                                        icon = <RiDribbbleFill />;
                                    }

                                    return (
                                        <li
                                            key={i}
                                            className="flex-initial m-0 p-0"
                                        >
                                            <a
                                                href={link}
                                                title={title}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                                className="btn-light flex justify-start items-center"
                                            >
                                                <span className="mr-2">
                                                    {icon}
                                                </span>
                                                <span>{network}</span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </PageHeader>

                <div className="flex flex-wrap justify-start items-start space-x-4 pb-8">
                    <div className="flex-initial w-full sm:w-64">
                        <Img
                            fluid={imgAvatar}
                            className="w-64 mx-auto bg-gray-900 rounded shadow-xl"
                            // style={{ maxWidth: "1080px" }}
                        />
                    </div>
                    <div className="flex-1 w-full p-4 prose">
                        <MDXProvider>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </div>

                <SecBooks />
            </div>
        </Layout>
    );
};

export const query = graphql`
    query authorQuery($id: String) {
        file(id: { eq: $id }) {
            childMdx {
                body
                frontmatter {
                    user
                    title
                    links
                    avatar {
                        childImageSharp {
                            fluid(maxWidth: 750, maxHeight: 750) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default Author;
