import {
  MarketConfigured as MarketConfiguredEvent,
  RebalancerSet as RebalancerSetEvent
} from "../generated/MonarchAgent/MonarchAgent"
import { MarketCap, User} from "../generated/schema"

export function handleMarketConfigured(event: MarketConfiguredEvent): void {
  // see if user exist
  let user = User.load(event.params.user);
  if (!user) {
    user = new User(event.params.user);
    user.save();
  }

  // // check if marketCap exist
  let marketCapId = event.params.marketId.concat(user.id).toString()
  let marketCap = MarketCap.load(marketCapId);
  if (!marketCap) {
    marketCap = new MarketCap(marketCapId);
    marketCap.marketId = event.params.marketId;
    marketCap.cap = event.params.cap;
    marketCap.user = user.id;
  } else {
    // update market cap
    marketCap.cap = event.params.cap;
  }
  marketCap.save();
}

export function handleRebalancerSet(event: RebalancerSetEvent): void {
  
  let user = User.load(event.params.user);
  if (!user) {
    user = new User(event.params.user);
    user.rebalancer = event.params.rebalancer;
  } else {
    user.rebalancer = event.params.rebalancer;
  }
  user.save();
}
