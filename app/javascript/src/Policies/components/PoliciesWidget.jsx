// @flow

import React from 'react'
import { bindActionCreators } from 'redux'
import * as actions from 'Policies/actions/index'
import { PolicyConfig } from 'Policies/components/PolicyConfig'
import { PolicyChain } from 'Policies/components/PolicyChain'
import { PolicyRegistry } from 'Policies/components/PolicyRegistry'
import { PolicyChainHiddenInput } from 'Policies/components/PolicyChainHiddenInput'
import { connect } from 'react-redux'

import type {
  State
} from 'Policies/types/State'

import type {
  Dispatch
} from 'Policies/types/index'

const mapStateToProps = (state: State) => {
  return {
    registry: state.registry,
    chain: state.chain,
    policyConfig: state.policyConfig,
    ui: state.ui
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    boundActionCreators: bindActionCreators(actions, dispatch)
  }
}

const PolicyList = ({registry, chain, policyConfig, ui, boundActionCreators}) => {
  const chainActions = {
    openPolicyRegistry: boundActionCreators.openPolicyRegistry,
    editPolicy: boundActionCreators.editPolicy,
    sortPolicyChain: boundActionCreators.sortPolicyChain
  }
  const policyConfigActions = {
    submitPolicyConfig: boundActionCreators.submitPolicyConfig,
    removePolicyFromChain: boundActionCreators.removePolicyFromChain,
    closePolicyConfig: boundActionCreators.closePolicyConfig,
    updatePolicyConfig: boundActionCreators.updatePolicyConfig
  }
  const policyRegistryActions = {
    addPolicy: boundActionCreators.addPolicy,
    closePolicyRegistry: boundActionCreators.closePolicyRegistry
  }

  return (
    <div className="PoliciesWidget">
      <PolicyChain
        chain={chain}
        visible={ui.chain}
        actions={chainActions}
      />
      <PolicyRegistry
        items={registry}
        visible={ui.registry}
        actions={policyRegistryActions}
      />
      <PolicyConfig
        visible={ui.policyConfig}
        policy={policyConfig}
        actions={policyConfigActions}
      />
      <PolicyChainHiddenInput policies={chain} />
    </div>
  )
}

const PoliciesWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(PolicyList)

export default PoliciesWidget
