import {
  MarketConfigured as MarketConfiguredEvent,
  RebalancerSet as RebalancerSetEvent
} from "../generated/MonarchAgent/MonarchAgent"
import { MarketConfigured, RebalancerSet } from "../generated/schema"

export function handleMarketConfigured(event: MarketConfiguredEvent): void {
  let entity = new MarketConfigured(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.marketId = event.params.marketId
  entity.cap = event.params.cap

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRebalancerSet(event: RebalancerSetEvent): void {
  let entity = new RebalancerSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.rebalancer = event.params.rebalancer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
