import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import bn from "utils/bemnames";
import PropTypes from "utils/propTypes";
import Typography from "./Typography";

const bem = bn.create("page");

const Page = ({
  title,
  breadcrumbs,
  backTo,
  tag: Tag,
  className,
  children,
  ...restProps
}) => {
  const history = useHistory();
  const classes = bem.b("px-3", className);

  return (
    <Tag className={classes} {...restProps}>
      <div className={bem.e("header")}>
        {backTo && (
          <div
            className={bem.e("back-button")}
            onClick={() => history.push(backTo)}
          >
            <FaArrowCircleLeft size={30} />{" "}
          </div>
        )}
        {title && typeof title === "string" ? (
          <Typography type="h1" className={bem.e("title")}>
            {title}
          </Typography>
        ) : (
          title
        )}
        {breadcrumbs && (
          <Breadcrumb className={bem.e("breadcrumb")}>
            <BreadcrumbItem>Home</BreadcrumbItem>
            {breadcrumbs.length &&
              breadcrumbs.map(({ name, active }, index) => (
                <BreadcrumbItem key={index} active={active}>
                  {name}
                </BreadcrumbItem>
              ))}
          </Breadcrumb>
        )}
      </div>
      {children}
    </Tag>
  );
};

Page.propTypes = {
  tag: PropTypes.component,
  backTo: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  children: PropTypes.node,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      active: PropTypes.bool,
    })
  ),
};

Page.defaultProps = {
  tag: "div",
  title: "",
};

export default Page;
