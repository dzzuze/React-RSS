import { Component } from 'react';
import Card from './Card';

interface ResultsProps {
  items: Array<{
    name: string;
    description: string;
    image: string;
  }>;
}

export default class Results extends Component<ResultsProps> {
  render() {
    const cards = this.props.items.map((item, index) => (
      <Card
        key={index}
        name={item.name}
        description={item.description}
        image={item.image}
      />
    ));

    return (
      <div className="space-y-3 p-4 bg-white rounded-lg shadow">{cards}</div>
    );
  }
}
