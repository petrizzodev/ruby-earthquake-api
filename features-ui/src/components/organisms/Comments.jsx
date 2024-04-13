import React, { useState, useEffect } from 'react';
import '../../index.css';

export default function Comments({ id }) {
    const [comments, setComments] = useState([]);
    const [commentBody, setCommentBody] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const commentsApiUrl = `http://127.0.0.1:3000/api/features/${id}/comments`;

    
    const fetchComments = async () => {
        try {
            const response = await fetch(commentsApiUrl);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };


    const handleAddComment = async () => {
        const newComment = { body: commentBody };

        try {
            const response = await fetch(commentsApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            });

            if (response.ok) {
                setCommentBody('');
                fetchComments();
            } else {
                console.error('Error adding comment:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [id]);

    return (
        <div className="comments-container">
            <div className="comments-header">
                <button onClick={() => setIsExpanded(!isExpanded)} className='btn-success' style={{marginRight:'1rem'}}>
                    {isExpanded ? 'Ocultar Comentarios' : 'Mostrar Comentarios'}
                </button>
                <button onClick={handleAddComment} className='btn-success'>Agregar Comentario</button>
            </div>
            
            {isExpanded && (
                <div className="comments-list">
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                            {comment.body}
                        </div>
                    ))}
                </div>
            )}
            
            <textarea
                className='textarea'
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="Escribe un comentario..."
            ></textarea>
        </div>
    );
}
