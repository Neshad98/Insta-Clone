import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";


const FeedPost = ({ post }) => {
  return (
    <>
      {/* <PostHeader post={post}></PostHeader> */}
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={post.imageURL} alt={"profile image pic"} />
      </Box>
      {/* <PostFooter username={username}></PostFooter> */}
    </>
  );
};

export default FeedPost;