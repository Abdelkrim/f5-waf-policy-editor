import { BaseVisitor } from "../interface/base.visitor";
import { FieldResolverVisitor } from "../interface/field-resolver.visitor";
import { PolicyEditorDispatch } from "../../policy-editor.types";
import { GridFieldValue } from "../../../../component/policy-editor/controls/grid-field-value.type";
import { policyEditorJsonVisit } from "../../policy-editor.actions";
import { DropListFieldControl } from "../../../../component/policy-editor/controls/field-control/drop-list.field-control";
import { set as _set } from "lodash";
import { CheckboxFieldControl } from "../../../../component/policy-editor/controls/field-control/checkbox.field-control";
import { TextEditFieldControl } from "../../../../component/policy-editor/controls/field-control/text-edit.field-control";
import { EvasionDescription } from "../../../../model/policy-schema/policy.definitions";

export class EvasionsFieldResolver
  extends BaseVisitor
  implements FieldResolverVisitor
{
  constructor(
    protected rowIndex: number,
    protected dispatch: PolicyEditorDispatch,
    protected json: any
  ) {
    super(dispatch, json);
  }

  get hasAdvancedRows(): boolean {
    return false;
  }

  getAdvancedRows(): GridFieldValue[] {
    return [];
  }

  remove(): void {
    this.dispatch(
      policyEditorJsonVisit((currentJson) => {
        currentJson.policy["blocking-settings"].evasions.splice(
          this.rowIndex,
          1
        );

        if (currentJson.policy["blocking-settings"].evasions.length === 0)
          delete currentJson.policy["blocking-settings"].evasions;
      })
    );
  }

  getBasicRows(): GridFieldValue[] {
    const path = `blocking-settings.evasions[${this.rowIndex}]`;

    return [
      {
        title: "Description",
        errorPath: [`instance.${path}.description`],
        controlInfo: new DropListFieldControl(
          this.json.description,
          (value) => {
            this.dispatch(
              policyEditorJsonVisit((currentJson) => {
                _set(currentJson, `policy.${path}.description`, value);
              })
            );
          },
          Object.values(EvasionDescription)
        ),
      },
      {
        title: "Enabled",
        errorPath: [`instance.${path}.enabled`],
        controlInfo: new CheckboxFieldControl(this.json.enabled, (value) => {
          this.dispatch(
            policyEditorJsonVisit((currentJson) => {
              _set(currentJson, `policy.${path}.enabled`, value);
            })
          );
        }),
      },
      {
        title: "Learn",
        errorPath: [`instance.${path}.learn`],
        controlInfo: new CheckboxFieldControl(this.json.enabled, (value) => {
          this.dispatch(
            policyEditorJsonVisit((currentJson) => {
              _set(currentJson, `policy.${path}.learn`, value);
            })
          );
        }),
      },
      {
        title: "Max Decoding Passes",
        errorPath: [`instance.${path}.maxDecodingPasses`],
        controlInfo: new TextEditFieldControl(
          this.json.maxDecodingPasses,
          (value) => {
            this.dispatch(
              policyEditorJsonVisit((currentJson) => {
                _set(currentJson, `policy.${path}.maxDecodingPasses`, value);
              })
            );
          },
          {},
          { variant: "outlined", size: "small" }
        ),
      },
    ];
  }
}
