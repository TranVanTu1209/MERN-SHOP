import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, isAdmin = false, keywords }) => {
  return (
    pages > 1 && (
      <Pagination>
        {Array(pages)
          .fill(1)
          .map((_, index) => (
            <LinkContainer
              key={index}
              active={index + 1 === page}
              to={
                isAdmin
                  ? `/admin/product-list/page/${index + 1}`
                  : keywords
                  ? `/search/${keywords}/page/${index + 1}`
                  : `/page/${index + 1}`
              }
              onClick={() =>
                window.scrollTo({
                  top: 80,
                  left: 0,
                  behavior: "smooth",
                })
              }
            >
              <Pagination.Item active={index + 1 === page}>
                {index + 1}
              </Pagination.Item>
            </LinkContainer>
          ))}
      </Pagination>
    )
  );
};

export default Paginate;
