import React from 'react';
import Card from '../Card/Card';
import './Board.css';

export default function Board(props) {
    return (
        <div className='board'>
            {props.data.map(cardItemData => <Card key={cardItemData.id} title={cardItemData.name} imgUrl={cardItemData.image} cardId={cardItemData.id} onCardClick={props.onCardClick} />)}
        </div>
    )
}