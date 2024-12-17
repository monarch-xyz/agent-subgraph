import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { MarketConfigured } from "../generated/schema"
import { MarketConfigured as MarketConfiguredEvent } from "../generated/MonarchAgent/MonarchAgent"
import { handleMarketConfigured } from "../src/monarch-agent"
import { createMarketConfiguredEvent } from "./monarch-agent-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let marketId = Bytes.fromI32(1234567890)
    let cap = BigInt.fromI32(234)
    let newMarketConfiguredEvent = createMarketConfiguredEvent(
      user,
      marketId,
      cap
    )
    handleMarketConfigured(newMarketConfiguredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("MarketConfigured created and stored", () => {
    assert.entityCount("MarketConfigured", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "MarketConfigured",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "MarketConfigured",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "marketId",
      "1234567890"
    )
    assert.fieldEquals(
      "MarketConfigured",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "cap",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
