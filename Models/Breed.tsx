import Attributes from './Attributes';
import Relationship from './Relationship';

class Breed {
  public id: string;
  public type: string;
  public attributes: Attributes;
  public relationships: Relationship;

  constructor(id: string = '', type: string = '', attributes: Attributes = new Attributes(), relationships: Relationship = new Relationship()) {
    this.id = id;
    this.type = type;
    this.attributes = attributes;
    this.relationships = relationships;
  }
}

export default Breed;
