package warmstoragechain_test

import (
	"testing"

	keepertest "github.com/BlockCraftsman/WarmStorageChain/testutil/keeper"
	"github.com/BlockCraftsman/WarmStorageChain/testutil/nullify"
	"github.com/BlockCraftsman/WarmStorageChain/x/warmstoragechain"
	"github.com/BlockCraftsman/WarmStorageChain/x/warmstoragechain/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		ResourceList: []types.Resource{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.WarmstoragechainKeeper(t)
	warmstoragechain.InitGenesis(ctx, *k, genesisState)
	got := warmstoragechain.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.ResourceList, got.ResourceList)
	// this line is used by starport scaffolding # genesis/test/assert
}
