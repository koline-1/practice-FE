import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PostAPI } from "../api/PostAPI";

function Write() {
    const [form] = useForm();
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        state && form.setFieldsValue(state)
    }, [state])

    const { mutate: create } = useMutation(
        (post) => PostAPI.createPost(post),
        {
            onSuccess: () => {
                message.success("게시글이 작성되었습니다.");
                navigate("/");
            }
        }
    )

    const { mutate: update } = useMutation(
        (post) => PostAPI.updatePost(post),
        {
            onSuccess: () => {
                message.success("게시글이 수정되었습니다.");
                navigate("/");
            }
        }
    )

    const handleFinish = () => {
        const target = { ...state, ...form.getFieldsValue() };
        state?.id ? update(target) : create(target);
    }

    return (
        <>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                    name="title"
                    label="제목"
                    rules={[
                        {
                            required: true,
                            message: "제목은 필수입력 항목입니다."
                        },
                        {
                            max: 100,
                            message: "제목은 100자 이하로만 가능합니다."
                        }
                    ]}
                >
                    <Input maxLength={100} placeholder="제목을 입력해주세요." />
                </Form.Item>
                <Form.Item
                    name="content"
                    label="내용"
                    rules={[
                        {
                            required: true,
                            message: "내용은 필수입력 항목입니다."
                        },
                        {
                            max: 100,
                            message: "내용은 100자 이하로만 가능합니다."
                        }
                    ]}
                >
                    <TextArea maxLength={1000} placeholder="내용을 입력해주세요." />
                </Form.Item>
                <Form.Item>
                    <Button style={{ marginInline: "10px" }} type="primary" onClick={() => form.submit()}>저장</Button>
                    <Button style={{ marginInline: "10px" }} onClick={() => navigate('/')}>목록</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Write;