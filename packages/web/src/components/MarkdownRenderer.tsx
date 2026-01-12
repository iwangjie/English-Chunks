import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './MarkdownRenderer.module.css';

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <div className={styles.markdown}>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer; 