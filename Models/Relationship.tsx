import Group from './Group';

class Relationship {
  public group: Group;

  constructor(group: Group = new Group()) {
    this.group = group;
  }
}

export default Relationship;
