import { registerEnumType } from "../../../node_modules/type-graphql";

enum JLPT_NUMBER {
  N1 = "n1",
  N2 = "n2",
  N3 = "n3",
  N4 = "n4",
  N5 = "n5"
}

registerEnumType(JLPT_NUMBER, { name: "JLPT_NUMBER" });

export default JLPT_NUMBER;
