import lodashUnion from 'lodash/union';
import type {OnyxCollection} from 'react-native-onyx';
import * as API from '@libs/API';
import Onyx from 'react-native-onyx';
import type {
    OpenPolicyCategoriesPageParams,
} from '@libs/API/parameters';
import ONYXKEYS from '@src/ONYXKEYS';
import {READ_COMMANDS} from '@libs/API/types';
import Log from '@libs/Log';
import type {
    RecentlyUsedCategories,
} from '@src/types/onyx';

let allRecentlyUsedCategories: OnyxCollection<RecentlyUsedCategories> = {};
Onyx.connect({
    key: ONYXKEYS.COLLECTION.POLICY_RECENTLY_USED_CATEGORIES,
    waitForCollectionCallback: true,
    callback: (val) => (allRecentlyUsedCategories = val),
});

function openPolicyCategoriesPage(policyID: string) {
    if (!policyID) {
        Log.warn('openPolicyCategoriesPage invalid params', {policyID});
        return;
    }

    const params: OpenPolicyCategoriesPageParams = {
        policyID,
    };

    API.read(READ_COMMANDS.OPEN_POLICY_CATEGORIES_PAGE, params);
}

function buildOptimisticPolicyRecentlyUsedCategories(policyID?: string, category?: string) {
    if (!policyID || !category) {
        return [];
    }

    const policyRecentlyUsedCategories = allRecentlyUsedCategories?.[`${ONYXKEYS.COLLECTION.POLICY_RECENTLY_USED_CATEGORIES}${policyID}`] ?? [];

    return lodashUnion([category], policyRecentlyUsedCategories);
}

export {
    openPolicyCategoriesPage,
    buildOptimisticPolicyRecentlyUsedCategories,
};
