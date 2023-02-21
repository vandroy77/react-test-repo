import './styles.css'

    export const PostCard = ({title,body,id,cover}) => {
  return (
    <div className="post">
      <img key={id + 1} src={cover} alt={title}></img>
      <div className="post-content">
        <h2>{title} </h2>
        <p>{body}</p>
      </div>
    </div>
  );
};