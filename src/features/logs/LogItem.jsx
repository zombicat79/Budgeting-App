import { useState } from 'react';
import { capitaliseFirst } from './../../utils/conversion/string-management'; 

function LogItem({ logData }) {
    const [expanded, setExpanded] = useState(false);

    let containerClasses = `flex flex-col border px-[1rem] py-[0.5rem] gap-2 hover:cursor-pointer hover:border-teal-500 hover:animate-pulse 
        print:border-0 print:border-y print:border-dashed print:py-[1rem]`;
    let identifierClasses = "flex justify-center items-center basis-[10%] border-2 bg-gray-500 print:hidden";
    let operationDetails;

    function spitChangeHistory(changeLog) {
        return (
            <>
            {changeLog.map((change) => {
                return (
                    <span key={change.key}>
                        <span className="font-semibold italic">- {change.key.toUpperCase()} </span>
                        <span>updated from </span>
                        <span className="font-semibold">"{change.oldValue}" </span>
                        <span>to </span>
                        <span className="font-semibold">"{change.newValue}"</span>
                        <br/>
                    </span>
                )
            })}
            </>
        );
    }
    
    switch(logData.assetType) {
        case "budget":
            identifierClasses += " text-teal-500 border-teal-500"
            containerClasses += " w-[90%]"
            switch(logData.actionType) {
                case "updated":
                    operationDetails = 
                    <>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Budget named as</span><span>: {logData.assetData.name.toUpperCase()}</span><br/>
                        <span className="font-semibold">* </span><span className="font-semibold underline">ID</span><span>: {logData.assetData.id}</span><br/>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Underwent the following changes</span><span>:</span><br/>
                        {spitChangeHistory(logData.assetData.updateDetails)}
                    </>
                    break;
                case "deleted":
                    operationDetails = 
                    <>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Destroyed budget name</span><span>: {logData.assetData.name.toUpperCase()}</span><br/>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Destroyed budget ID</span><span>: {logData.assetData.id}</span><br/>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Amount unlocked for further tracking</span><span>: {logData.assetData.initialBalance} €</span><br/>
                    </>
                    break;
                default:
                    // case "created"
                    operationDetails = 
                    <>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Created with ID</span><span>: {logData.assetData.id}</span><br/>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Budget named as</span><span>: {logData.assetData.name.toUpperCase()}</span><br/>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Allocated an amount of</span><span>: {logData.assetData.initialBalance} €</span><br/>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Set to cover period</span><span>: {logData.assetData.startDate} to {logData.assetData.endDate}</span>
                    </>
            }
            break;
        case "entry":
            identifierClasses += " text-orange-800 border-orange-800"
            containerClasses += " w-[80%]"
            switch(logData.actionType) {
                case "updated":
                    operationDetails = 
                    <>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Entry named as</span><span>: {logData.assetData.name.toUpperCase()}</span><br/>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Belongs to</span><span>: {logData.assetData.parentBudget.name.toUpperCase()} budget | ID = {logData.assetData.parentBudget.id}</span><br/>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Underwent the following changes</span><span>:</span><br/>
                        {spitChangeHistory(logData.assetData.updateDetails)}
                    </>
                    break;
                case "deleted":
                    operationDetails = 
                    <>
                        <span className="font-semibold">* </span><span className="font-semibold underline">{logData.assetData.isExpense ? 'EXPENSE' : 'INCOME' } destroyed</span><span>: {logData.assetData.isExpense ? `${logData.assetData.amount} € returned to parent budget` : `-${logData.assetData.amount} removed from parent budget`}</span><br/>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Entry named as</span><span>: {logData.assetData.name.toUpperCase()}</span><br/>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Belonged to</span><span>: {logData.assetData.parentBudget.name.toUpperCase()} budget | ID = {logData.assetData.parentBudget.id}</span><br/>
                    </>
                    break;
                default:
                    // case "created"
                    operationDetails = 
                    <>
                        <span className="font-semibold">* </span><span className="font-semibold underline">New {logData.assetData.isExpense ? 'EXPENSE' : 'INCOME' } registered</span><span>: {logData.assetData.isExpense ? '-' : ''}{logData.assetData.amount} € under the category of {logData.assetData.category.toUpperCase()}</span><br/>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Entry named as</span><span>: {logData.assetData.name.toUpperCase()}</span><br/>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Belongs to</span><span>: {logData.assetData.parentBudget.name.toUpperCase()} budget | ID = {logData.assetData.parentBudget.id}</span>
                    </>
            }
            break;
        default:
            // case "project"
            identifierClasses += " text-yellow-300 border-yellow-300"
            switch(logData.actionType) {
                case "terminated":
                    operationDetails = 
                    <>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Number of active budgets at termination</span><span>: {logData.assetData.attachedBudgets.length}</span><br/>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Amount being tracked at termination</span><span>: {logData.assetData.allocatedAllowance} €</span><br/>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Untracked amount at termination</span><span>: {logData.assetData.availableAllowance} €</span>
                    </>
                    break;
                default:
                    // case "created"
                    operationDetails = 
                    <>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Total amount of money to be tracked</span><span>: {logData.assetData.cashAllowance} €</span><br/>
                        <span className="font-semibold">* </span><span className="font-semibold underline">Tracking window ends on</span><span>: {logData.assetData.expiryDate}</span>
                    </>
            }
    }

    return (
        <div className={containerClasses} onClick={() => setExpanded((prev) => !prev)}>
            <div className="flex gap-8">
                <div className={identifierClasses}>
                    {logData.assetType === 'project' ? 'P' : logData.assetType === 'budget' ? 'B' : 'E'}
                </div>
                <div className="flex-1">
                    <p className="text-left">
                        <span className="font-semibold">operation #{logData.id} &rarr;&nbsp;</span>
                        {capitaliseFirst(logData.assetType)} {logData.actionType}
                        &nbsp;@&nbsp;
                        {logData.timestamp}
                    </p>
                </div>
                {expanded ? <p className="text-3xl print:hidden">&uarr;</p> : <p className="text-3xl print:hidden">&darr;</p>}
            </div>
            <p className={expanded ? "text-left" : "text-left hidden print:block"}>{operationDetails}</p>
        </div>
    )
}

export default LogItem;