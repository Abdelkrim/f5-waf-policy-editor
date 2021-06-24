import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { GridFieldValue } from "./grid-field-value.type";
import { usePolicyEditorState } from "../../../store/policy-editor/policy-editor.hooks";
import ErrorIcon from "@material-ui/icons/Error";

export type GridFieldValueProps = {
  rows: GridFieldValue[];
};

export const GridFieldValueControl: React.FunctionComponent<GridFieldValueProps> =
  ({ rows }) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const { jsonValidationErrors } = usePolicyEditorState();

    return (
      <Grid container spacing={1}>
        <Grid container item spacing={1} xs={12}>
          {rows.map((row, index) => {
            return (
              <React.Fragment key={index}>
                <Grid container item alignItems={"center"} xs={3}>
                  <Typography
                    color={selectedIndex === index ? "primary" : undefined}
                    variant="body2"
                  >
                    {row.title}
                  </Typography>
                </Grid>
                <Grid container xs={1} item alignItems={"center"}>
                  {jsonValidationErrors.find((x) =>
                    row.errorPath
                      ? row.errorPath.find((err) => err === x.property)
                      : false
                  ) ? (
                    <ErrorIcon style={{ color: "red" }} />
                  ) : undefined}
                </Grid>
                <Grid item xs={8}>
                  {row.controlInfo.createControl({
                    fullWidth: true,
                    hiddenLabel: true,
                    variant: "filled",
                    margin: "dense",
                    onSelect: () => setSelectedIndex(index),
                    onBlur: () => setSelectedIndex(-1),
                  })}
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </Grid>
    );
  };
