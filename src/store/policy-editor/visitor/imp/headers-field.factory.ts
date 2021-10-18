import { Header } from "../../../../model/policy-schema/policy.definitions";
import { VisitorFactoryBase } from "../base/visitor-factory.base";
import { PolicyEditorDispatch } from "../../policy-editor.types";

export class HeadersFieldFactory extends VisitorFactoryBase<Header> {
  constructor(protected dispatch: PolicyEditorDispatch, protected json: any) {
    super("policy.headerss", dispatch, json);
  }
}
