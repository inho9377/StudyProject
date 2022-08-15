import React from 'react';

function MainHeader({ text, href, key, id, userId}) {
    // Bracket 사용하고 싶을 때 {"{"}
    return (
        <a href={href}>{text}</a>
    )
}

export default MainHeader