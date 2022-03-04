import style from "../../../../styles/Admin.module.css"
export const Settings = () => {
  return (
    <div className={style.tabItem}>
         <h2>Posts</h2>
         <form className={style.form} >
          <div className={style.formItem}>
            <label>Title:</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
            />
          </div>
          </form> 
    </div>
  )
}
