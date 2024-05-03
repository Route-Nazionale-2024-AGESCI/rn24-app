import React from "react";
import { Link } from "react-router-dom";
import parse, { domToReact } from "html-react-parser";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const renderLink = (linkElement) => {
  const { attribs, children } = linkElement;
  if (attribs && attribs.href && attribs.href.startsWith("/pages/")) {
    const { href: to, ...otherProps } = attribs;
    const returnElement = (
      <Typography sx={{ textDecoration: "none" }} component="span">
        <Link to={to} {...otherProps} style={{ textDecoration: "none" }}>
          {domToReact(children)}
        </Link>
      </Typography>
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

      if (node.name === "h2") {
        return (
          <Typography variant="h4" sx={{ marginBottom: 3 }}>
            {domToReact(node.children)}
          </Typography>
        );
      }
      if (node.name === "h3") {
        return (
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            {domToReact(node.children)}
          </Typography>
        );
      }
      if (node.name === "h4") {
        return (
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {domToReact(node.children)}
          </Typography>
        );
      }
      if (node.name === "li") {
        return (
          <li>
            <Typography variant="body1">{domToReact(node.children)}</Typography>
          </li>
        );
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
