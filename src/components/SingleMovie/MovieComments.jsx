import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";
import {
  commentsAtom,
  singleMovieAtom,
  tokenAtom,
  moviesAtom,
} from "../../recoil/atom";
import deleteIcon from "../../assets/trash.png";
import { apiURl } from "../../configuration/apiconfig";

const MovieComments = () => {
  const [token, setToken] = useRecoilState(tokenAtom);
  const [singleMovie] = useRecoilState(singleMovieAtom);
  const [comments, setComments] = useRecoilState(commentsAtom);
  const [movies, setMovies] = useRecoilState(moviesAtom);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURl}/comments/${singleMovie?._id}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (singleMovie?._id) {
      fetchData();
    }
  }, [singleMovie]);

  const handleAddComment = async () => {
    if (commentText.length > 0) {
      try {
        const createCommentResponse = await fetch(`${apiURl}/comments/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId: singleMovie?._id,
            userEmail: token.email,
            text: commentText,
          }),
        });

        if (createCommentResponse.ok) {
          const responseComments = await fetch(
            `${apiURl}/comments/${singleMovie?._id}`
          );
          const commentesData = await responseComments.json();
          setComments(commentesData);
          setCommentText("");
        }
      } catch (error) {
        console.error("Error Create Comment:", error);
      }
    } else {
      alert("Please fill the empty fields");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const deleteCommentResonse = await fetch(
        `${apiURl}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: token.email,
          }),
        }
      );
      if (deleteCommentResonse.ok) {
        const responseComments = await fetch(
          `${apiURl}/comments/${singleMovie?._id}`
        );
        const commentesData = await responseComments.json();
        setComments(commentesData);
        setCommentText("");
      }
    } catch (error) {
      console.error("Error Login:", error);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-4xl">
        {Object.keys(token).length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Comments ({comments?.length})
              </h2>
            </div>
            <div className="mb-6">
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  rows={6}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder={token?.email}
                />
              </div>
              <button
                onClick={handleAddComment}
                className="cursor-pointer inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-teal-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Post comment
              </button>
            </div>
          </>
        )}
        {comments?.map((comment) => {
          return (
            <article
              key={comment._id}
              className="py-6 text-base bg-white rounded-lg dark:bg-gray-900"
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="inline-flex items-center text-sm text-gray-900 dark:text-white font-semibold">
                    <p className="mr-2">{comment.userEmail?.split("@")[0]}</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time
                      pubdate=""
                      dateTime="2022-02-08"
                      title="February 8th, 2022"
                    >
                      {dayjs(comment.createdAt).format("DD/MM/YYYY")}
                    </time>
                  </p>
                  <div>
                    {comment.userEmail === token?.email && (
                      <img
                        onClick={() => handleDeleteComment(comment?._id)}
                        src={deleteIcon}
                        className="cursor-pointer h-4 ml-2 transition duration-500 hover:scale-125"
                      />
                    )}
                  </div>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">{comment.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default MovieComments;
