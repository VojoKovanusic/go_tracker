import {Serializable} from "../../generated/model";

export interface Product extends Serializable {
  id: number;
  title: string;
  description: string;
  username: string;
  price: number;
}
