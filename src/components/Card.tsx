import { Component } from 'react';

interface CardProps {
  name: string;
  description: string;
  image: string;
}

export default class Card extends Component<CardProps> {
  render() {
    return (
      <div className="border rounded-lg p-4 shadow-sm flex flex-col items-center">
        <img
          src={this.props.image}
          alt={this.props.name}
          className="w-full h-40 object-contain rounded"
        />{' '}
        <h3 className="text-lg font-bold">{this.props.name}</h3>
        <p className="text-sm text-gray-600">{this.props.description}</p>
      </div>
    );
  }
}
