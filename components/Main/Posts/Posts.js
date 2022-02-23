import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Card } from "../../UI/Card/Card";

export const Posts = ({ blogList, style }) => {
  return (
    <div className={style.blogContainer}>
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
    >
      <Masonry gutter="20px">
        {
          blogList.map((post, index) => (
            <Card key={index} post={post} />
          ))
        }
      </Masonry>
    </ResponsiveMasonry>
  </div>
  )
}
