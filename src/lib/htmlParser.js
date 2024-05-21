import React from "react";
import { Link } from "react-router-dom";
import parse, { domToReact } from "html-react-parser";
import Divider from "@mui/material/Divider";

const renderLink = (linkElement) => {
  const { attribs, children } = linkElement;
  if (attribs && attribs.href && attribs.href.startsWith("/pages/")) {
    const { href: to, ...otherProps } = attribs;
    const returnElement = (
      <Link to={to} {...otherProps}>
        {domToReact(children)}
      </Link>
    );
    return returnElement;
  }
  if (attribs && attribs.href) {
    const returnElement = (
      <a target="_blank" {...attribs}>
        {domToReact(children)}
      </a>
    );
    return returnElement;
  }
  return null;
};

const renderHtmlWithLinks = (htmlString) => {
  return parse(htmlString, {
    replace: (node) => {
      if (node.name === "a") {
        return renderLink(node);
      }

      if (node.name === "hr") {
        return <Divider variant="fullWidth" sx={{ marginY: 2 }} />;
      }
    },
  });
};

const HtmlWithRouterLinks = ({ htmlString }) => {
  const renderedHtml = renderHtmlWithLinks(htmlString);

  return <>{renderedHtml}</>;
};

export default HtmlWithRouterLinks;
