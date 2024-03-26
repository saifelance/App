import * as API from '@libs/API';
import type {
    OpenPolicyCategoriesPageParams,
} from '@libs/API/parameters';
import {READ_COMMANDS} from '@libs/API/types';
import Log from '@libs/Log';

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

export {
    openPolicyCategoriesPage,
};
