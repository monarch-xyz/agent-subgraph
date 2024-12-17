import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  MarketConfigured,
  RebalancerSet
} from "../generated/MonarchAgent/MonarchAgent"

export function createMarketConfiguredEvent(
  user: Address,
  marketId: Bytes,
  cap: BigInt
): MarketConfigured {
  let marketConfiguredEvent = changetype<MarketConfigured>(newMockEvent())

  marketConfiguredEvent.parameters = new Array()

  marketConfiguredEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  marketConfiguredEvent.parameters.push(
    new ethereum.EventParam("marketId", ethereum.Value.fromFixedBytes(marketId))
  )
  marketConfiguredEvent.parameters.push(
    new ethereum.EventParam("cap", ethereum.Value.fromUnsignedBigInt(cap))
  )

  return marketConfiguredEvent
}

export function createRebalancerSetEvent(
  user: Address,
  rebalancer: Address
): RebalancerSet {
  let rebalancerSetEvent = changetype<RebalancerSet>(newMockEvent())

  rebalancerSetEvent.parameters = new Array()

  rebalancerSetEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  rebalancerSetEvent.parameters.push(
    new ethereum.EventParam(
      "rebalancer",
      ethereum.Value.fromAddress(rebalancer)
    )
  )

  return rebalancerSetEvent
}
