// External library dependencies.
import React from 'react';

// WordPress package dependencies.
const {
  addAction,
} = window?.vendor?.wp?.hooks;

// Divi package dependencies.
const {
  RichTextContainer,
  TextContainer,
  UploadContainer
} = window?.divi?.fieldLibrary;
const {
  GroupContainer
} = window?.divi?.modal;
const {
  // Renderer - HTML
  ModuleContainer,

  // Renderer - Styles
  StyleContainer,

  // Renderer - Classnames
  elementClassnames,

  // Settings - Content
  AdminLabelGroup,
  BackgroundGroup,
  FieldContainer,

  // Settings - Design
  AnimationGroup,
  BorderGroup,
  BoxShadowGroup,
  FiltersGroup,
  FontGroup,
  FontBodyGroup,
  SizingGroup,
  SpacingGroup,
  TransformGroup,

  // Settings - Advanced
  PositionSettingsGroup,
  ScrollSettingsGroup,
  TransitionGroup,
  VisibilitySettingsGroup,
  placeholderContent
} = window?.divi?.module;
const {
  registerModule
} = window?.divi?.moduleLibrary;

// Module metadata that is used in both Frontend and Visual Builder.
import metadata from './module.json';

/**
 * React function component for rendering module style.
 */
const ModuleStyles = ({
  attrs,
  elements,
  settings,
  orderClass,
  mode,
  state,
  noStyleTag
}) => (
  <StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
    {/* Element: Module */}
    {elements.style({
      attrName: 'module',
      styleProps: {
        disabledOn: {
          disabledModuleVisibility: settings?.disabledModuleVisibility
        }
      }
    })}

    {/* Element: Title */}
    {elements.style({
      attrName: 'title',
    })}
    {/* Element: Content */}
    {elements.style({
      attrName: 'content',
    })}
    {elements.style({
      attrName: 'button',
    })}
  </StyleContainer>
);

/**
 * React function component for registering module script data.
 */
const ModuleScriptData = ({
  elements,
}) => (
  <React.Fragment>
    {elements.scriptData({
      attrName: 'module',
    })}
  </React.Fragment>
);

/**
 * Function for registering module classnames.
 */
const moduleClassnames = ({
  classnamesInstance,
  attrs,
}) => {
  // Add element classnames.
  classnamesInstance.add(
    elementClassnames({
      attrs: attrs?.module?.decoration ?? {},
    }),
  );
}

/**
 * Simple Quick Module.
 */
const simpleQuickModule = {
  // Metadata that is used on Visual Builder and Frontend
  metadata,

  // Layout renderer components.
  renderers: {
    // React Function Component for rendering module's output on layout area.
    edit: ({
      attrs,
      id,
      name,
      elements,
    }) => {
      const imageSrc = attrs?.image?.innerContent?.desktop?.value?.src ?? ''
      const imageAlt = attrs?.image?.innerContent?.desktop?.value?.alt ?? '';
      return (
      <ModuleContainer
        attrs={attrs}
        elements={elements}
        id={id}
        moduleClassName="d5_tut_divi_simple_module"
        name={name}
        scriptDataComponent={ModuleScriptData}
        stylesComponent={ModuleStyles}
        classnamesFunction={moduleClassnames}
      >
        {elements.styleComponents({
          attrName: 'module',
        })}
        <div className="et_pb_module_inner">
          <img src={imageSrc} alt={imageAlt} />
          {elements.render({
            attrName: 'title',
          })}
          {elements.render({
            attrName: 'content',
          })}
          {elements.render({
            attrName: 'button',
          })}
        </div>
      </ModuleContainer>
      )
    },
  },

  // Settings component.
  settings: {
    // React function component that renders module settings' content panel.
    content: ({ defaultSettingsAttrs }) => (
      <React.Fragment>
        <GroupContainer
          id="image"
          title="Image"
        >
          <FieldContainer
              attrName="image.innerContent"
              label="Image"
              description="Image"
              subName="src"
          >
              <UploadContainer />
          </FieldContainer>
        </GroupContainer>
        <GroupContainer
          id="mainContent"
          title="Text"
        >
        
          <FieldContainer
            attrName="title.innerContent"
            label="Title"
            description="Title"
          >
            <TextContainer />
          </FieldContainer>
          <FieldContainer
            attrName="content.innerContent"
            label="Content"
          >
            <RichTextContainer />
          </FieldContainer>
          <FieldContainer
            attrName="button.innerContent"
            label="Button"
            description="Button"
          >
            <TextContainer />
          </FieldContainer>
        </GroupContainer>
        <BackgroundGroup />
        <AdminLabelGroup
          defaultGroupAttr={defaultSettingsAttrs?.adminLabel}
        />
      </React.Fragment>
    ),

    // React function component that renders module settings' design panel.
    design: () => (
      <React.Fragment>
        <FontGroup
          attrName="title.decoration.font"
          groupLabel="Title Font"
        />
        <FontBodyGroup
          attrName="content.decoration.bodyFont"
          groupLabel="Content Font"
        />
        <FontBodyGroup
          attrName="button.decoration.bodyFont"
          groupLabel="Button Font"
        />
        <SizingGroup />
        <SpacingGroup />
        <BorderGroup />
        <BoxShadowGroup />
        <FiltersGroup />
        <TransformGroup />
        <AnimationGroup />
      </React.Fragment>
    ),

    // React function component that renders module settings' advanced panel.
    advanced: () => (
      <React.Fragment>
        <VisibilitySettingsGroup />
        <TransitionGroup />
        <PositionSettingsGroup />
        <ScrollSettingsGroup />
      </React.Fragment>
    ),
  },

  // Attribute that is automatically added into the module when the module is inserted
  // into the layout so that the newly inserted module has some placeholder content
  placeholderContent: {
    module: {
      decoration: {
        background: {
          desktop: {
            value: {
              color: '#DFDFDF',
            }
          }
        },
      }
    },
    title: {
      innerContent: {
        desktop: {
          value: 'Module Title'
        }
      }
    },
    content: {
      innerContent: {
        desktop: {
          value: 'Module Content'
        }
      }
    },
    button: {
        innerContent: {
          desktop: {
            value: 'Learn More'
          }
        }
    },
    image: {
      innerContent: {
        desktop: {
          value: {
            src: placeholderContent.image.landscape,
          },
        },
      },
    },
  },
};

// Register module.
addAction('divi.moduleLibrary.registerModuleLibraryStore.after', 'd5Tut.simpleQuickModule', () => {
  registerModule(simpleQuickModule.metadata, simpleQuickModule);
});