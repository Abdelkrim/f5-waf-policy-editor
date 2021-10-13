import { useStyles } from "../../../utils/styles.hook";
import { useVisitor } from "../../../store/policy-editor/visitor/interface/base.visitor";
import { usePolicyEditorState } from "../../../store/policy-editor/policy-editor.hooks";
import { Box, Button } from "@material-ui/core";
import { GridTableValueControl } from "../controls/grid.table-value.control";
import { stringCompare } from "../../../utils/string-compare.util";
import * as React from "react";
import { HostnamesFactory } from "../../../store/policy-editor/visitor/imp/hostnames.factory";
import { HostnamesVisitorFactory } from "../../../store/policy-editor/visitor/factory/imp/hostnames.visitor-factory";
import { defaultHostname } from "../../../model/policy-editor.defaults.model";

export const HostnamesPage: React.VoidFunctionComponent = () => {
  const classes = useStyles();

  const fieldFactory = useVisitor(HostnamesFactory);
  const visitorFactory = useVisitor(HostnamesVisitorFactory);

  const { showDefaultPolicy } = usePolicyEditorState();

  const {
    titles,
    visitors,
    default: defValues,
  } = visitorFactory.getResolvers();

  return (
    <Box className={classes.pageContent}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => fieldFactory.create(defaultHostname())}
      >
        Add Hostname
      </Button>
      <Box>
        <GridTableValueControl
          titles={titles}
          visitors={(showDefaultPolicy
            ? [...visitors, ...defValues]
            : visitors
          ).sort((a, b) => stringCompare(a.key(), b.key()))}
        />
      </Box>
    </Box>
  );
};