import React from "react";
import { Link } from "react-router-dom";
import parse, { domToReact } from "html-react-parser";
import Typography from "@mui/material/Typography";

const renderLink = (linkElement) => {
  const { attribs, children } = linkElement;
  if (attribs && attribs.href && attribs.href.startsWith("/pages/")) {
    const { href: to, ...otherProps } = attribs;
    const returnElement = (
      <Typography sx={{ color: "agesciPurple.main" }} component="span">
        <Link to={to} style={{ textDecoration: "none" }} {...otherProps}>
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
    },
  });
};

const HtmlWithRouterLinks = ({ htmlString }) => {
  const renderedHtml = renderHtmlWithLinks(htmlString);

  return <>{renderedHtml}</>;
};

export default HtmlWithRouterLinks;
