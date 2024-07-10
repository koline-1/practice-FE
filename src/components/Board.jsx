import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { PostAPI } from "../api/PostAPI";
  
const columns = [
    {
      title: '번호',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
      render: (text, post) => <Link to="/write" state={post}>{text}</Link>
    },
    {
      title: '내용',
      dataIndex: 'content',
      key: 'content',
    },
];

function Board() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    const { isFetching } = useQuery({
        queryFn: () => PostAPI.getPostList(0, 20),
        queryKey: ["GET_POST_LIST"],
        onSuccess: (result) => {
            setPosts(result);
        }
    })

    return (
        <>
            {
                !isFetching && (
                    <Table
                        style={{ marginBottom: "50px" }}
                        dataSource={posts}
                        columns={columns}
                        pagination={false}
                    />
                )
            }
            <Button onClick={() => navigate("/write")}>작성</Button>
        </>
    )
}

export default Board;