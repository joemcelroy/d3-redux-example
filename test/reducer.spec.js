import reducer from "../src/redux/reducer"

describe("reducer", () => {

  it("initial state", () => {
    expect(reducer({},{})).toEqual({})
  })

})
