import { Component } from "react";
import "./styles.css";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import { LoadPostsButton } from "../../components/LoadPostButton";
import { TextInput } from "../../components/TextInput";

export default class Home extends Component {
  state = {
    posts: [],
    allposts: [],
    page: 0,
    postPerPage: 12,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postPerPage } = this.state;
    const postAndPhotos = await loadPosts();
    this.setState({
      posts: postAndPhotos.slice(page, postPerPage),
      allposts: postAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postPerPage, allposts, posts } = this.state;
    const nextPage = page + postPerPage;
    const nextsPosts = allposts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextsPosts);

    this.setState({ posts, page: nextPage });
  };

  handleOnChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postPerPage, allposts, searchValue } = this.state;
    const noMorePost = page + postPerPage >= allposts.length;

    const filteredPosts = !!searchValue
      ? allposts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className="container"> 

      <div className="search-container">
        {!!searchValue && <h1>Search Value: {searchValue}</h1>}
          <TextInput
            handleOnChange={this.handleOnChange}
            searchValue={searchValue}
          />
        </div>

        {filteredPosts.length === 0 && <h1>Post Doesn't exist.</h1>}
        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

        <div className="button-container">
          {!searchValue && (
            <LoadPostsButton
              text={"load more posts"}
              onclick={this.loadMorePosts}
              disabled={noMorePost}
            />
          )}
        </div>
      </section>
    );
  }
}
