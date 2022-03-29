import Link from "next/link";
import { useState } from "react";
import { ITEM_PER_PAGE } from "../../../constants/constants";
import style from "../../../styles/pagination.module.css";
import { Icon } from "../Icon";

export const Pagination = ({ page, totalCount }) => {

  const [paginateValues, setPaginateValues] = useState({
    start: page === 1 ? 0 : page * ITEM_PER_PAGE - ITEM_PER_PAGE,
    end: page * ITEM_PER_PAGE,
    itemPerPage: ITEM_PER_PAGE,
    pageCount: Math.ceil(totalCount / ITEM_PER_PAGE),
  });

  var buttons = [];
  for (var i = 0; i < paginateValues.pageCount; i++) {
    buttons.push(
      <Link key={i} href={`/page/${i + 1}`}>
        <a className={`${page === Number(i + 1) ? style.active : ""}`}>{i + 1}</a>
      </Link>
    );
  }

  return (
    <div className={style.pagination}>
      <label>
        There are <strong>{totalCount}</strong> posts...
      </label>
      {page > 1 && (
        <Link href={`/page/${page - 1}`}>
          <a className={style.prevNext}>
            <Icon.LeftArrow size="24" />
          </a>
        </Link>
      )}
      {buttons}
      {page !== paginateValues.pageCount && (
        <Link href={`/page/${page + 1}`}>
          <a className={`${style.prevNext} ${style.next}`}>
            <Icon.RightArrow size="24" />
          </a>
        </Link>
      )}
    </div>
  );
};
