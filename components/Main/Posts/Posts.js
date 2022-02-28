import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { ITEM_PER_PAGE } from "../../../constants/constants";
import { Card } from "../../UI/Card/Card";
import { Pagination } from "../../UI/Pagination/Pagination";
export const Posts = ({ page, blogList, totalCount, style }) => {
  return (
    <div className={style.blogContainer}>
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
    >
      <Masonry gutter="20px">
        {
          blogList.slice(0,ITEM_PER_PAGE).map((post, index) => (
            <Card key={index} post={post} />
          ))
        }
      </Masonry>
    </ResponsiveMasonry>
    <Pagination page={page} totalCount={page === 1 ? blogList.length : totalCount} />
  </div>
  )
}
